import CompanionCard from '@/components/CompanionCard';
import CompanionList from '@/components/CompanionList';
import Cta from '@/components/Cta';
import { recentSessions } from '../constants/index';
import { getAllCompanions } from '@/lib/actions/companion.action';
import { getRecentSessions } from '@/lib/actions/companion.action';
import { getSubjectColor } from '@/lib/utils';

const Page = async () => {
  const companions = await getAllCompanions({ limit: 2 });
  const recentSessionsCompanions = await getRecentSessions(5);


  return (
    <main>
      <h1 className='text-2xl'>Popular Companions</h1>
      <section className='home-section'>

        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className='home-section'>
        <CompanionList
          title="Recent Completed Sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  )
}

export default Page