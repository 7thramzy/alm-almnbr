'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useServices = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for the session to be ready
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true);
      }
    });
  }, []);

  return useQuery({
    queryKey: ['services'],
    enabled: ready, // 👈 this prevents the query from running too early
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error("Error fetching services:", error);
        throw error;
      }

      return data;
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  });
};
