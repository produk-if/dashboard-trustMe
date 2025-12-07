'use client';

import { useEffect, useState } from 'react';
import { getStores, updateStoreStatus } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, RefreshCw, Loader2, Power, PowerOff } from "lucide-react";
import { LoadingPage } from "@/components/ui/loading";

export default function StoresPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [togglingStore, setTogglingStore] = useState<string | null>(null);

  const fetchStores = async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    }
    const result = await getStores();
    if (result.success) {
      setStores(result.data || []);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleToggleStatus = async (storeId: string, currentStatus: boolean) => {
    setTogglingStore(storeId);
    const result = await updateStoreStatus(storeId, !currentStatus);
    if (result.success) {
      setStores(stores.map(store =>
        store.store_id === storeId
          ? { ...store, is_active: !currentStatus }
          : store
      ));
    }
    setTogglingStore(null);
  };

  if (isLoading) {
    return <LoadingPage message="Loading stores data..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stores Management</h1>
          <p className="text-muted-foreground">Oversee all registered stores and their details.</p>
        </div>
        <Button
          onClick={() => fetchStores(true)}
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
          <CardTitle>All Stores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store Name</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Menus</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>
                    <div className="font-medium">{store.store_name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {store.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{store.merchant.full_name || store.merchant.username}</div>
                    <div className="text-xs text-muted-foreground">{store.merchant.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{store.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1 text-sm max-w-[200px] truncate">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                      <span title={store.address}>{store.city}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={store.is_active ? 'default' : 'destructive'}>
                      {store.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {store._count.menus} Items
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={store.is_active ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleToggleStatus(store.store_id, store.is_active)}
                      disabled={togglingStore === store.store_id}
                      className="gap-2"
                    >
                      {togglingStore === store.store_id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : store.is_active ? (
                        <>
                          <PowerOff className="h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Power className="h-4 w-4" />
                          Activate
                        </>
                      )}
                    </Button>
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
