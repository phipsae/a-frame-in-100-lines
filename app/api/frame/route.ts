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
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="red" />
  <circle cx="50" cy="10" r="0" />
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
