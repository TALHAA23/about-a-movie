import capitalizer from "../assets/capitalizer";
import { GENRES } from "../assets/genres";
import { RATINGS } from "../assets/ratings";
import { RATINGSRC } from "../assets/ratingSources";
import { useContext, useRef } from "react";
import { FilterContext } from "../MovieForMe";
import { MouseEvent } from "react";

export function Filter({ filter, isShowFilter, setFilter }: any) {
  const slider = useRef<null | HTMLDivElement>(null);
  function scrollSlider(event: MouseEvent<HTMLButtonElement>) {
    if (!slider.current) return;
    const currentButton = event.currentTarget.name;
    const scrollByValue =
      currentButton == "Next"
        ? slider.current.offsetWidth
        : -slider.current.offsetWidth;
    slider.current.scrollBy(scrollByValue, 0);
  }
  return (
    <div
      onMouseLeave={() => setFilter(false)}
      className={`fixed z-10 bottom-0 md:top-0 w-full md:w-[500px] shadow-xl bg-slate-100 origin-bottom md:origin-left transition duration-300 ${
        isShowFilter ? "scale-y-100 md:scale-x-100" : "scale-y-0 md:scale-x-0"
      }`}
    >
      <div
        ref={slider}
        className="filter flex items-center h-[90%] scroll-smooth overflow-x-scroll"
      >
        <MultiSelectFilterElement
          name="gener"
          title="Select Gener"
          options={GENRES}
          filteredValues={filter.gener}
        />
        <RangeInputFilterElement
          name="yearOfRelease"
          title="Specify Release Range"
          value={filter.yearOfRelease}
        />
        <MultiSelectFilterElement
          name="rating"
          title="Select Rating Mode"
          options={RATINGS}
          filteredValues={filter.rating}
        />
        <MultiOptionFilterElement
          filteredValues={filter.ratingFromSrc}
          title="Select Rating from popular sources"
          options={RATINGSRC}
        />
      </div>
      <div className="flex justify-center space-x-2">
        {["Prev", "Next"].map((btn) => (
          <button
            name={btn}
            onClick={(event) => scrollSlider(event)}
            className="border-2 border-green-800 rounded-md px-7 py-2 hover:bg-green-900 hover:text-white"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiSelectFilterElement({ name, title, options }: any) {
  const updateFilter = useContext(FilterContext);
  const elements = options.map((option: string) => {
    const title = capitalizer(option);
    return (
      <div>
        <input
          onChange={(e) => updateFilter(e)}
          className="peer"
          type="checkbox"
          name={name}
          value={option}
          id={option}
          hidden
        />
        <label
          htmlFor={option}
          className="px-2 py-2 border-2 border-green-400 hover:bg-green-200 peer-checked:bg-green-300 rounded select-none"
        >
          {title}
        </label>
      </div>
    );
  });
  return (
    <div className="flex-shrink-0 w-full">
      <h1 className="font-[Poppins] font-semibold mb-4 text-center">{title}</h1>
      <div className="flex flex-wrap gap-5 justify-center">{elements}</div>
    </div>
  );
}

function RangeInputFilterElement({ name, value, title }: any) {
  const updateFilter = useContext(FilterContext);

  return (
    <div className="flex-shrink-0 w-full">
      <h1 className="font-[Poppins] font-semibold mb-4 text-center">{title}</h1>
      <div className="flex gap-1 justify-center">
        <input
          name={name}
          id="start"
          type="number"
          min={1970}
          max={value.end - 1}
          value={value.start}
          onChange={(e) => updateFilter(e)}
          className="cursor-pointer hover:bg-green-200 px-2 py-5 rounded-lg text-3xl font-semibold outline-none text-center bg-inherit border-2 border-green-400"
        />
        <input
          name={name}
          id="end"
          type="number"
          min={1970}
          max={2023}
          value={value.end}
          onChange={(e) => updateFilter(e)}
          className="cursor-pointer hover:bg-green-200 px-2 py-5 rounded-lg text-3xl font-semibold outline-none text-center bg-inherit border-2 border-green-400"
        />
      </div>
    </div>
  );
}

function MultiOptionFilterElement({ filteredValues, title, options }: any) {
  const updateFilter = useContext(FilterContext);

  function changeRating(event: MouseEvent<HTMLDivElement>) {
    const ratingSrc = event.currentTarget?.parentElement?.dataset.name;
    const rating = event.currentTarget.dataset.value;
    updateFilter({ name: "ratingFromSrc", value: rating, ratingSrc });
  }

  const elements = options.map((option: string) => {
    const title = capitalizer(option);
    const filterdRating = filteredValues[option.split(" ").join("")];
    return (
      <div className="w-1/2 relative pl-2 shadow-md flex items-center justify-between h-9 gap-2 group">
        <img className="h-9" src={`/${option}-logo.png`} />
        <h3 className="text-sm">{title}</h3>
        <h3 className="bg-greesn-100 h-full px-4 py-1 font-semibold font-[poppins]">{`${filterdRating}${
          filterdRating == 10 ? "" : "+"
        }`}</h3>
        <div
          data-name={option.split(" ").join("")}
          className=" -translate-x-2 z-10 absolute w-full flex flex-col gap-1 scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
        >
          {[2, 4, 6, 8, 10].map((rating) => (
            <div
              onClick={(e) => changeRating(e)}
              data-value={rating}
              className="w-full py-2 border-2 bg-green-100 hover:bg-green-200 rounded-md text-center"
            >
              {rating}
            </div>
          ))}
        </div>
      </div>
    );
  });
  return (
    <div className="flex-shrink-0 w-full flex flex-col items-center gap-2">
      <h1 className="font-[Poppins] font-semibold mb-4 text-center">{title}</h1>
      {elements}
    </div>
  );
}
