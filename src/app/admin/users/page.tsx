'use client';

import { useEffect, useState } from 'react';
import { getUsers, getUserStats, updateUserStatus, verifyUser, deleteUser } from './actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users, UserCheck, Store, UserPlus, Search,
  MoreHorizontal, CheckCircle, XCircle, Trash2,
  Eye, Shield, RefreshCw, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingPage, LoadingTable, LoadingCard, LoadingSpinner } from "@/components/ui/loading";

interface User {
  id: number;
  user_id: string;
  username: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  user_type: string | null;
  created_at: string;
  _count: {
    stores: number;
    orders: number;
  };
}

interface UserStats {
  totalUsers: number;
  customers: number;
  merchants: number;
  verifiedUsers: number;
  recentUsers: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    const [usersResult, statsResult] = await Promise.all([
      getUsers(),
      getUserStats()
    ]);

    if (usersResult.success) {
      setUsers(usersResult.data || []);
    }
    if (statsResult.success) {
      setStats(statsResult.data || null);
    }

    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifyUser = async (userId: string) => {
    setActionLoading(userId);
    const result = await verifyUser(userId);
    if (result.success) {
      await fetchData(true);
    }
    setActionLoading(null);
  };

  const handleToggleStatus = async (userId: string, currentType: string | null) => {
    setActionLoading(userId);
    const isActive = currentType !== 'inactive';
    const result = await updateUserStatus(userId, !isActive);
    if (result.success) {
      await fetchData(true);
    }
    setActionLoading(null);
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setActionLoading(userId);
      const result = await deleteUser(userId);
      if (result.success) {
        await fetchData(true);
      }
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'merchant' && user.user_type === 'merchant') ||
      (filterType === 'customer' && user.user_type !== 'merchant') ||
      (filterType === 'verified' && user.user_type === 'verified') ||
      (filterType === 'inactive' && user.user_type === 'inactive');

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (userType: string | null) => {
    switch (userType) {
      case 'merchant':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Merchant</Badge>;
      case 'verified':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>;
      case 'inactive':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Inactive</Badge>;
      default:
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading users data..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground">Manage and verify your customers and merchants.</p>
        </div>
        <Button
          onClick={() => fetchData(true)}
          variant="outline"
          className="gap-2"
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Refresh
            </>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                <Users className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalUsers}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Customers</CardTitle>
                <UserCheck className="w-5 h-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.customers}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Merchants</CardTitle>
                <Store className="w-5 h-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.merchants}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">Verified</CardTitle>
                <Shield className="w-5 h-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.verifiedUsers}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">New (7 days)</CardTitle>
                <UserPlus className="w-5 h-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.recentUsers}</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Filters & Search */}
      <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Click on actions to verify, activate/deactivate, or delete users.</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full sm:w-[250px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Filter: {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterType('all')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType('customer')}>Customers</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType('merchant')}>Merchants</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType('verified')}>Verified</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterType('inactive')}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="border-2 border-primary/20">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.full_name || user.username}</div>
                          <div className="text-xs text-muted-foreground">@{user.username}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.user_type)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{user.email || '-'}</div>
                        <div className="text-muted-foreground">{user.phone || '-'}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {user.user_type === 'merchant' ? (
                          <div className="flex items-center gap-1">
                            <Store className="w-4 h-4 text-muted-foreground" />
                            {user._count.stores} Stores
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            {user._count.orders} Orders
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <AnimatePresence mode="wait">
                        {actionLoading === user.user_id ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center justify-end gap-2"
                          >
                            <LoadingSpinner size="sm" />
                            <span className="text-xs text-muted-foreground">Processing...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="actions"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {user.user_type !== 'verified' && user.user_type !== 'merchant' && (
                                  <DropdownMenuItem
                                    onClick={() => handleVerifyUser(user.user_id)}
                                    className="text-green-600"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Verify User
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(user.user_id, user.user_type)}
                                >
                                  {user.user_type === 'inactive' ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                      Activate User
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="w-4 h-4 mr-2 text-yellow-500" />
                                      Deactivate User
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteUser(user.user_id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
