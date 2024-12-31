import EPcomp from './educational-partners';

const Page = () => {
  return (
    <div className="p-4 flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-9">
        <p className="text-2xl font-bold">Educational Partners:</p>
      </div>

      <EPcomp />
    </div>
  );
};

export default Page;
