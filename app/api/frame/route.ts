import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  function svgToDataURL(svg: string): string {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const transactionCount = await client.getTransactionCount({
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  });

  // if (!isValid) {
  //   return new NextResponse('Message not valid', { status: 500 });
  // }

  // const text = message.input || '';
  // let state = {
  //   page: 0,
  // };
  // try {
  //   state = JSON.parse(decodeURIComponent(message.state?.serialized));
  // } catch (e) {
  //   console.error(e);
  // }

  // SVG code
  const svgCode = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" fill="none">
<rect width="1000" height="1000" fill="black"/>
<ellipse cx="499.836" cy="499.835" rx="372" ry="372" transform="rotate(90.5938 499.836 499.835)" fill="url(#paint0_linear_1_57)"/>
<path d="M131.944 164C149.648 164 164 149.673 164 132C164 114.327 149.648 100 131.944 100C115.148 100 101.368 112.896 100 129.31H142.37V134.69H100C101.368 151.104 115.148 164 131.944 164Z" fill="#F7E582"/>
<defs>
<linearGradient id="paint0_linear_1_57" x1="875.281" y1="495.473" x2="124.015" y2="503.26" gradientUnits="userSpaceOnUse">
<stop stop-color="#AD8B27"/>
<stop offset="0.479167" stop-color="#F7E582"/>
<stop offset="1" stop-color="#AD8B27"/>
</linearGradient>
</defs>
</svg>
  `;

  const svgDataUrl = svgToDataURL(svgCode);

  /**
   * Use this code to redirect to a different page
   */
  // if (message?.button === 3) {
  //   return NextResponse.redirect(
  //     'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
  //     { status: 302 },
  //   );
  // }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: 'link',
          label: 'Mint NFT',
          target: 'https://opensea.io',
        },
      ],
      image: {
        src: svgDataUrl,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      // state: {
      //   page: state?.page + 1,
      //   time: new Date().toISOString(),
      // },
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
