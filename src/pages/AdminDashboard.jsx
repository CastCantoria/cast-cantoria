import MemberImporter from "../components/admin/MemberImporter";
import MemberList from "../components/admin/MemberList";
import MediaManager from "../components/admin/MediaManager";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛠️ Tableau de bord Admin</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>👥 Gestion des membres</h2>
        <MemberImporter />
        <MemberList />
      </section>

      <section>
        <h2>🖼️ Gestion des fichiers multimédias</h2>
        <MediaManager />
      </section>
    </div>
  );
};

export default AdminDashboard;