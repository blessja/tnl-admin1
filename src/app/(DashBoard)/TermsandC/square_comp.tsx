
interface Sqcompprops {
    title: string;
    content: React.ReactNode;
    minheight: number;
}

const Sqcomp: React.FC<Sqcompprops> = ({title, content, minheight}) => {
    return(
        <div
            className="flex flex-col items-center justify-between rounded-2xl border-2 border-[#1F9F90] md:w-[1203px] w-[323px]"
            style={{
                minHeight: minheight || "420px", // Use `minheight` if provided; default to 420px
                height: minheight ? "auto" : "960px", // Set height to auto if minheight is given, else use default
            }}
        >
            {/*for title and upper half */}
            <div className="flex items-center justify-center md:w-[1200px] md:h-[80px] h-[100px] w-[320px] rounded-tl-xl rounded-tr-xl" style={{backgroundColor: "#EBF7F6"}}>
                <p className="text-black md:text-3xl text-xl font-bold">{title}</p>
            </div>

            {/*for text */}
            <div className="w-full p-4 text-left">
                {content}
            </div>
        </div>
    );
}

export default Sqcomp;