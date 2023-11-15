import Pagination from './components/Pagination';

export default function Home() {
  return (
    <main>
      <Pagination itemCount={100} pageSize={10} currentPage={3} />
    </main>
  );
}
