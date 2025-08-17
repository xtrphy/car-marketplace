import { redirect } from 'next/navigation';

const page = async () => {
    redirect('/cars');
};

export default page;