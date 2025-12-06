'use server'

import { prisma } from '@/lib/prisma'

export async function getStores() {
  try {
    const stores = await prisma.stores.findMany({
      orderBy: {
        created_at: 'desc'
      },
      include: {
        merchant: {
          select: {
            full_name: true,
            username: true,
            email: true
          }
        },
        _count: {
          select: {
            menus: true
          }
        }
      }
    });

    // Convert Decimal objects to plain numbers for client components
    const serializedStores = stores.map(store => ({
      ...store,
      latitude: store.latitude ? Number(store.latitude) : null,
      longitude: store.longitude ? Number(store.longitude) : null,
    }));

    return { success: true, data: serializedStores };
  } catch (error) {
    console.error('Error fetching stores:', error);
    return { success: false, error: 'Failed to fetch stores' };
  }
}
