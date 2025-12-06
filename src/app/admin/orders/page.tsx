'use client';

import { useEffect, useState } from 'react';
import { getOrders } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";
import { LoadingPage } from "@/components/ui/loading";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchOrders = async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    }
    const result = await getOrders();
    if (result.success) {
      setOrders(result.data || []);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) {
    return <LoadingPage message="Loading orders data..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders Management</h1>
          <p className="text-muted-foreground">Track and manage all orders.</p>
        </div>
        <Button
          onClick={() => fetchOrders(true)}
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.order_id}</TableCell>
                  <TableCell>{order.store?.store_name || 'Unknown Store'}</TableCell>
                  <TableCell>
                    <div className="text-sm">{order.customer?.full_name || order.customer?.username || 'Guest'}</div>
                  </TableCell>
                  <TableCell>${(order.total_price || 0).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      order.order_status === 'completed' ? 'default' :
                        order.order_status === 'cancelled' ? 'destructive' : 'secondary'
                    }>
                      {order.order_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
