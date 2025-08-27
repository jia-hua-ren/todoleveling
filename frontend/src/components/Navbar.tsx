import GoogleLogIn from "@/components/GoogleLogIn";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-indigo-600">ToDo Leveling</h1>
        <ul className="flex space-x-6 font-medium">
          <GoogleLogIn />
        </ul>
      </div>
    </nav>
  );
};
