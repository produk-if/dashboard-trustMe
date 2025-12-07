'use server'

import { prisma } from '@/lib/prisma'

export async function getDashboardStats() {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Get date from last month for comparison
    const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [
      totalRevenueResult,
      totalUsers,
      totalOrders,
      recentOrders,
      monthlyRevenueResult,
      lastMonthRevenueResult,
      totalStores,
      // Orders by month for the chart (last 12 months)
      ordersThisMonth,
      ordersLastMonth,
      usersThisMonth,
      usersLastMonth,
      // Get monthly revenue data for the past 12 months
      monthlyData
    ] = await Promise.all([
      prisma.orders.aggregate({
        _sum: {
          total_price: true,
        },
      }),
      prisma.users.count(),
      prisma.orders.count(),
      prisma.orders.findMany({
        take: 5,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          customer: {
            select: {
              full_name: true,
              email: true,
              username: true
            },
          },
          store: {
            select: {
              store_name: true
            }
          }
        },
      }),
      prisma.orders.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          created_at: {
            gte: firstDayOfMonth,
            lt: nextMonth,
          },
        },
      }),
      prisma.orders.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          created_at: {
            gte: firstDayOfLastMonth,
            lte: lastDayOfLastMonth,
          },
        },
      }),
      prisma.stores.count(),
      prisma.orders.count({
        where: {
          created_at: {
            gte: firstDayOfMonth,
            lt: nextMonth,
          },
        },
      }),
      prisma.orders.count({
        where: {
          created_at: {
            gte: firstDayOfLastMonth,
            lte: lastDayOfLastMonth,
          },
        },
      }),
      prisma.users.count({
        where: {
          created_at: {
            gte: firstDayOfMonth,
            lt: nextMonth,
          },
        },
      }),
      prisma.users.count({
        where: {
          created_at: {
            gte: firstDayOfLastMonth,
            lte: lastDayOfLastMonth,
          },
        },
      }),
      // Get orders grouped by month for the chart
      getMonthlyRevenueData()
    ]);

    const totalRevenue = totalRevenueResult._sum.total_price || 0;
    const monthlyRevenue = monthlyRevenueResult._sum.total_price || 0;
    const lastMonthRevenue = lastMonthRevenueResult._sum.total_price || 0;

    // Calculate percentage changes
    const revenueChange = lastMonthRevenue > 0
      ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : monthlyRevenue > 0 ? 100 : 0;

    const ordersChange = ordersLastMonth > 0
      ? ((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100
      : ordersThisMonth > 0 ? 100 : 0;

    const usersChange = usersLastMonth > 0
      ? ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100
      : usersThisMonth > 0 ? 100 : 0;

    // Generate trend data for sparklines based on actual monthly data
    const revenueTrend = monthlyData.map(m => m.revenue);
    const ordersTrend = monthlyData.map(m => m.orders);
    const usersTrend = await getUsersTrend();

    return {
      totalRevenue,
      totalUsers,
      totalOrders,
      totalStores,
      recentOrders,
      monthlyRevenue,
      revenueChange: Math.round(revenueChange * 10) / 10,
      ordersChange: Math.round(ordersChange * 10) / 10,
      usersChange: Math.round(usersChange * 10) / 10,
      revenueTrend,
      ordersTrend,
      usersTrend,
      monthlyChartData: monthlyData
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalRevenue: 0,
      totalUsers: 0,
      totalOrders: 0,
      totalStores: 0,
      recentOrders: [],
      monthlyRevenue: 0,
      revenueChange: 0,
      ordersChange: 0,
      usersChange: 0,
      revenueTrend: [],
      ordersTrend: [],
      usersTrend: [],
      monthlyChartData: []
    };
  }
}

// Helper function to get monthly revenue data for the past 12 months
async function getMonthlyRevenueData() {
  const now = new Date();
  const months = [];

  for (let i = 11; i >= 0; i--) {
    const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);

    const [revenueResult, ordersCount] = await Promise.all([
      prisma.orders.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          created_at: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      prisma.orders.count({
        where: {
          created_at: {
            gte: startDate,
            lte: endDate,
          },
        },
      })
    ]);

    months.push({
      month: startDate.toLocaleString('default', { month: 'short' }),
      revenue: revenueResult._sum.total_price || 0,
      orders: ordersCount
    });
  }

  return months;
}

// Helper function to get users trend for the past 7 periods
async function getUsersTrend() {
  const now = new Date();
  const trend = [];

  for (let i = 6; i >= 0; i--) {
    const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);

    const count = await prisma.users.count({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    trend.push(count);
  }

  return trend;
}
