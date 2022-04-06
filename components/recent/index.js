//custom
import { AuthGuard } from "../elements/authGuard";
import Title from "../elements/title";
import RecentTable from "../tables/recentTable";

export default function Recent() {
  return (
    <AuthGuard>
      <div className="recent-page">
        <Title title="Recent History"/>
        <section>
          <RecentTable/>
        </section>
      </div>
    </AuthGuard>
  );
}
