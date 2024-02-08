export default function Landing() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className=" bg-gradient-to-b from-indigo-200 to-indigo-100 rounded-3xl px-7 py-6 font-semibolds">
        <div className="max-w-[600px] text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase font-[Poppins]">
            let us first set a filter
          </h1>
          <h2>filter helps to find the best match</h2>
          <small>
            click on{" "}
            <img className=" inline-block w-4" src="/filter-solid.svg" /> in the
            top left corner
          </small>
        </div>
      </div>
    </div>
  );
}
