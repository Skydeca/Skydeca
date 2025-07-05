export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white text-center p-8">
      <div>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">
          Welcome to Skydeca
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto mb-8">
          Your mission. Your media. Your meaning. Built in the cloud.
        </p>
        <a
          href="#"
          className="inline-block bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition"
        >
          Explore What's Coming
        </a>
      </div>
    </main>
  );
}
