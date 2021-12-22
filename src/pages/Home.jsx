import { Link } from "react-router-dom";
function Home() {
  return (
    <section className="home">
    

        <h2>Login coming soon!</h2>
        <img src="https://i.imgur.com/k09MUmB.png" alt="logo" />
        <Link to="/add">
          Create new project <i class="fas fa-plus"></i>
        </Link>
 
    </section>
  );
}
export default Home;
