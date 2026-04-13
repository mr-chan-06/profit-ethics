import HomeClient from '@/components/HomeClient';
import connectDB from '@/lib/db';
import Setting from '@/models/Setting';

export const dynamic = 'force-dynamic';

export default async function Page() {
  let settingsMap: Record<string, string> = {};
  try {
    await connectDB();
    const settings = await Setting.find({});
    settingsMap = settings.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (err) {
    console.error("Error loading settings in SSR", err);
  }

  return (
    <main>
      <HomeClient settings={settingsMap} />
    </main>
  );
}
