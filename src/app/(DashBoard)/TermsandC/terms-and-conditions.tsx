import Sqcomp from "./square_comp";

interface ContentPoint {
    text: string;
    color: string;
}

interface TermsandCProps {
    title: string;
    contentPoints: ContentPoint[]; // Updated to accept ContentPoint[]
}

const TermsandC: React.FC<TermsandCProps> = ({ title, contentPoints }) => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center p-8 gap-y-10">
                <Sqcomp
                    title={title}
                    content={
                        <ul className="list-disc pl-6 space-y-6">
                            {contentPoints.length > 0 ? (
                                contentPoints.map((point, index) => (
                                    <li key={index} style={{ color: point.color }}>
                                        {point.text}
                                    </li>
                                ))
                            ) : (
                                <li>No content points added yet.</li>
                            )}
                        </ul>
                    }
                    minheight={300}
                />
            </div>
        </div>
    );
};

export default TermsandC;
