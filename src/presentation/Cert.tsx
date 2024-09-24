import useScrollAnimation from '@/hooks/useScrollAnimation';
import CardImage from './components/CardImage';

export default function Cert() {
    const ref = useScrollAnimation()
    return (
      <div
        id="certificate"
        className="w-full h-full flex flex-col justify-center items-center p-4 gap-8"
      >
        <h2 className="w-full text-6xl border-b-4 border-slate-700">
          Certificates
        </h2>
        <div ref={ref} className="w-5/6 flex gap-8 items-center flex-wrap transition-opacity duration-1000">
            <CardImage image={"/assets/hackerrrank.png"} desc='Hackerrank: Go Basic' imgLink='https://www.hackerrank.com/certificates/2538ceecb284' />
            <CardImage image={"https://udemy-certificate.s3.amazonaws.com/image/UC-95300817-efa2-4d10-8590-00795ab8ca44.jpg"} desc='Udemy: Pemrograman Go-Lang: Pemula sampai Mahir' imgLink='https://udemy-certificate.s3.amazonaws.com/image/UC-95300817-efa2-4d10-8590-00795ab8ca44.jpg' />
            <CardImage image={"https://udemy-certificate.s3.amazonaws.com/image/UC-225b26aa-e78e-4e6f-a892-15a6b9c00e6a.jpg"} desc='Udemy: Docker: Pemula sampai Mahir' imgLink='https://udemy-certificate.s3.amazonaws.com/image/UC-225b26aa-e78e-4e6f-a892-15a6b9c00e6a.jpg' />
        </div>
      </div>
    );
}
