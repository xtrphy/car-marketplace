import CarPage from '@/widgets/car-card/ui/CarPage';
import React from 'react';
import { supabase } from '@/utils/supabase/supabaseClient';

const page = async ({ params }: { params: Promise<{ carId: string }> }) => {
    const { carId } = await params;

    const { data } = await supabase
        .from("cars")
        .select("*")
        .eq("id", `${carId}`)
        .single();

    return (
        <CarPage car={data} />
    );
};

export default page;