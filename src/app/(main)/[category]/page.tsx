import React from 'react';
import { supabase } from '@/utils/supabase/supabaseClient';
import { Database } from '@/utils/supabase/types/supabase';
import Cars from '@/widgets/cars/ui/Cars';

export type Car = Database["public"]["Tables"]["cars"]["Row"];

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = await params;

    let query = supabase.from("cars").select("*");

    if (category === "new") {
        query = query.eq("category", "new");
    } else if (category === "zapchasti") {
        query = query.eq("category", "zapchasti");
    } else if (category === "spectehnika") {
        query = query.eq("category", "spectehnika");
    } else {
        query = query.neq("category", "zapchasti");
    }

    const { data } = await query;

    return (
        <Cars carsArr={data ?? []} />
    );
};

export default CategoryPage;