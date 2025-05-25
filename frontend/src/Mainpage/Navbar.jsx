function Navbar() {
  return (
    <>
      <div className="w-full bg-orange-500 p-6">
        <div className="flex items-center justify-center">
          <ul className="flex gap-12 mt-2 text-white text-lg">
            <li>Home</li>
            <li>About</li>
            <li>Features</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
