import Image from "next/image";
import { Inter, Roboto_Mono } from "next/font/google";
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export default function Home() {
  const [domain, setDomain] = useState('');
  const [processedDomain, setProcessedDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(`/${domain}`,{method: 'POST'});
    const data = await response.json();
    setProcessedDomain(data.domain);
  };

  useEffect(() => {
    if (processedDomain) {
      setCountdown(3);
      setLoading(false);
      const timer = setTimeout(() => {
        window.location.href = `http://${processedDomain}`;
      }, 3000);

      const countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownTimer);
      };
    }
  }, [processedDomain]);

  return (
  <>
    <header className="flex flex-col justify-center items-center py-20">
      <h1 className="flex items-center gap-2">
        <Image
          src="/images/logo.png"
          width={80}
          height={96}
          className="sm:w-[100px] sm:h-[120px]"
          alt="63"
        />
        <span className="flex flex-col mt-3 sm:mt-0">
          <span className="text-gray-600 text-lg order-2 -mt-1"><strong className="text-purple-700">do</strong>main</span>
          <span className="text-xl">链尚</span>
        </span>
      </h1>
      <form className="mt-16 flex justify-center items-center px-5 w-full flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <div className={`${roboto_mono.className} flex items-center border-[3px] border-slate-900 rounded-md text-slate-700`}>
          <span className="bg-slate-900 text-white px-2 leading-10">https://63.do/</span>
          <input
            type="text"
            id="domain"
            value={domain}
            placeholder="fan.fan"
            className="h-10 bg-white flex-1 sm:w-72 px-1 rounded-e font-semibold"
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>
        <button className="bg-indigo-500 text-white font-semibold rounded-md w-20 h-11" type="submit">{loading ? <span>Loading</span> : 'GO!'}</button>
      </form>
      <div className="flex gap-2 mt-5 px-5">
        <h4 className="italic text-slate-500 shrink-0">{countdown > 0 && <span>{countdown} s...</span>}Redirect to:</h4>
        <p className={`${roboto_mono.className} whitespace-pre-wrap break-all break-words`}>{processedDomain ? <a href={`http://${processedDomain}`}>{processedDomain}</a> : 'fanfanfanfanfanfanfanfanfanfanfanfanfanfanfanfanfanfanfanfanfan.fan'}</p>
      </div>
    </header>
    <main
      className={`max-w-5xl mx-auto p-5 lg:p-0 ${inter.className} ${roboto_mono.variable}`}
    >
      <section className="p-5 md:p-8 bg-indigo-400/10 rounded-xl shadow-section border border-indigo-100 backdrop-blur">
        <h2 className="text-3xl mb-5 font-semibold">Overview</h2>
        <p className="text-slate-700">As we all know, the maximum length of a domain name is 63 characters. Although long domain names are interesting, they are extremely inconvenient to input. To solve this problem, <strong>63.do</strong> was born to provide a solution for inputting long domain names and bring convenience.</p>
      </section>
      <section className="p-5 md:p-8 mt-10 bg-violet-400/10 rounded-xl shadow-section border border-violet-100 backdrop-blur">
        <h2 className="text-3xl mb-5 font-semibold">Get started</h2>
        <p className="domain-guide">
					<span className="domain-slice sub">
						www
						<span className="txt"><i></i>sub<i></i></span>
					</span>
					<span className="domain-slice sld">
						.domain
						<span className="txt"><i></i>main<i></i></span>
					</span>
					<span className="domain-slice tld">
						.com
						<span className="txt"><i></i>suffix<i></i></span>
					</span>
				</p>
        <p className="text-slate-700">To help you understand, the domain name is broken down and defined (as shown in the figure ↑). Simply put, <strong>63.do</strong> is essentially a redirection tool. You only need to input part of the characters of a long domain name to jump to the complete domain name. The following examples illustrate how to use <strong>63.do</strong>:</p>
        <h3 className="my-5 text-xl font-semibold">Basic</h3>
        <div className="flex flex-col gap-4">
          <blockquote className="p-3 bg-white border border-gray-200 rounded-md text-sm">
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Input</span><code>https://63.do/<span className="param"><span className="sld">c</span><span className="tld">.cc</span></span></code></p>
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Redirect</span><code><a href="http://ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc.cc" target="_blank">ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc.cc</a></code></p>
          </blockquote>
          <p className="text-slate-700">For the <span className="sld">domain name body</span>, you only need to input the characters that need to be repeated, and it will automatically complete the repetition to 63 characters. The same applies to multiple characters. For the remaining characters that cannot be divided by 63, such as:</p>
          <blockquote className="p-3 bg-white  border border-gray-200 rounded-md text-sm">
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Input</span><code>https://63.do/<span className="param"><span className="sld">hello</span><span className="tld">.world</span></span></code></p>
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Redirect</span><code>hellohellohellohellohellohellohellohellohellohellohellohello<strong>hel</strong>.world</code></p>
          </blockquote>
        </div>
        <h3 className="my-5 text-xl font-semibold">Advanced(using formulas)</h3>
        <div className="flex flex-col gap-4">
          <blockquote className="p-3 bg-white border border-gray-200 rounded-md text-sm">
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Input</span><code>https://63.do/<span className="param"><span className="sld">abc*3</span><span className="tld">.com</span></span></code></p>
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Redirect</span><code>abcabcabc.com</code></p>
          </blockquote>
          <blockquote className="p-3 bg-white border border-gray-200 rounded-md text-sm">
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Input</span><code>https://63.do/<span className="param"><span className="sld">a*30+b*33</span><span className="tld">.com</span></span></code></p>
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Redirect</span><code><span className="text-lime-600">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span><span className="text-yellow-600">bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</span>.com</code></p>
          </blockquote>
          <blockquote className="p-3 bg-white border border-gray-200 rounded-md text-sm">
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Input</span><code>https://63.do/<span className="param"><span className="sld">abc*5+xyz*10</span><span className="tld">.com</span></span></code></p>
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Redirect</span><code><span className="text-lime-600">abcabcabcabcabc</span><span className="text-yellow-600">xyzxyzxyzxyzxyzxyzxyzxyzxyzxyz</span>.com</code></p>
          </blockquote>
          <blockquote className="p-3 bg-white border border-gray-200 rounded-md text-sm">
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Input</span><code>https://63.do/<span className="param"><span className="sld">a-z</span><span className="tld">.com</span></span></code></p>
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Redirect</span><code>abcdefghijklmnopqrstuvwxyz.com</code></p>
          </blockquote>
          <blockquote className="p-3 bg-white border border-gray-200 rounded-md text-sm">
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Input</span><code>https://63.do/<span className="param"><span className="sld">0-9</span><span className="tld">.com</span></span></code></p>
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Redirect</span><code>0123456789.com</code></p>
          </blockquote>
          <blockquote className="p-3 bg-white border border-gray-200 rounded-md text-sm">
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Input</span><code>https://63.do/<span className="param"><span className="sld">1-5+a-j</span><span className="tld">.com</span></span></code></p>
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Redirect</span><code>12345abcdefghij.com</code></p>
          </blockquote>
          <blockquote className="p-3 bg-white border border-gray-200 rounded-md text-sm">
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Input</span><code>https://63.do/<span className="param"><span className="sld">9-4+z-r</span><span className="tld">.com</span></span></code></p>
            <p className="flex gap-2"><span className="basis-[72px] shrink-0 text-gray-500">Redirect</span><code>987654zyxwvutsr.com</code></p>
          </blockquote>
        </div>
      </section>
    </main>
    <footer className="py-10 px-5 text-center text-sm text-slate-500">
      <p>Copyright &copy; {new Date().getFullYear()} <a href="https://boring.studio/" target="_blank" className="inline-flex gap-1 items-center">Boring<svg width="16" height="16" viewBox="0 0 98 98" xmlns="http://www.w3.org/2000/svg"><g transform="translate(.38)" fill="none" fillRule="evenodd"><circle cx="48.5" cy="48.5" r="48.5" fill="black"/><g transform="translate(19.587 30.779)" fill="#FFF"><circle cx="8.861" cy="8.861" r="8.861"/><circle cx="48.966" cy="8.861" r="8.861"/></g><rect fill="#FFF" x="32.644" y="67.154" width="32.644" height="7.462" rx="3.731"/></g></svg>Studio</a>.</p>
    </footer>
    <div className="fixed isolate -z-10 left-0 top-0 right-0 bottom-0 bg-[url(/images/bg.svg)] bg-[auto_100%] bg-[50%_100%] bg-no-repeat"></div>
  </>
  );
}
