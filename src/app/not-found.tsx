export default function NotFound() {
  return (
    <div className="h-screen flex flex-col w-full justify-center items-center gap-2">
      <div className="text-left bg-primary p-10 h-16 w-16 rounded-full -translate-y-10">
        <h3 className="text-5xl font-bold tracking-tight -translate-x-20">
          404
        </h3>
        <h4 className="text-2xl">Page Not Found</h4>
      </div>
    </div>
  );
}
