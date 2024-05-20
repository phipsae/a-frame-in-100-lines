import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  // const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

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
  <svg width="200" height="200" viewBox="-100 -100 200 200">
  <polygon points="0,0 80,120 -80,120" fill="#234236" />
  <polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
  <polygon points="0,-80 40,0 -40,0" fill="#38755B" />
  <rect x="-20" y="120" width="40" height="30" fill="brown" />
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
