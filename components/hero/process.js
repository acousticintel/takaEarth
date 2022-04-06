import Image from 'next/image';

export default function Process() {
  return (
    <div className="process">
      <div className="absolute z-10 w-96 h-96 -left-40 -bottom-52 opacity-90">
        <img src="/assets/blob.svg" alt="" />
      </div>
      <h1
        className="w-full py-2 text-5xl font-bold leading-tight 
          text-center text-gray-800"
      >
        How it Works
      </h1>
      <div className="inst">
        <div className="inst-cont">
          <div className="image">
            <Image src="/assets/login.svg" alt="take photo" layout="fill" />
          </div>
          <h3>Login</h3>
          <p
            className="text-gray-800 text-center text-base px-6 
                mb-5"
          >
            Login or create account.
          </p>
        </div>
        <div className="inst-cont">
          <div className="image">
            <Image src="/assets/drop.svg" alt="take photo" layout="fill" />
          </div>
          <h3>Select</h3>
          <p
            className="text-gray-800 text-center text-base px-6 
                mb-5"
          >
            Select waste type.
          </p>
        </div>
        <div className="inst-cont">
          <div className="image">
            <Image src="/assets/throw.svg" alt="take photo" layout="fill" />
          </div>
          <h3>Dispose</h3>
          <p
            className="text-gray-800 text-center text-base px-6 
                mb-5"
          >
            Drop off or request pick up
          </p>
        </div>
        <div className="inst-cont">
          <div className="image">
            <Image src="/assets/redeem.svg" alt="take photo" layout="fill" />
          </div>
          <h3>Reedeem</h3>
          <p
            className="text-gray-800 text-center text-base px-6 
                mb-5"
          >
            Redeem points with cash back coupons.
          </p>
        </div>
      </div>
    </div>
  );
}
