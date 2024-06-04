import { getEventById } from '@/utils/getEventById';
import { notFound } from 'next/navigation';
import type { IdParams } from '@/types/idParams';
import { env } from '@/env';
import { CopyToClipboardButton } from '@/components/copyToClipboard';
import { QRCodeSVG } from 'qrcode.react';
import { headers } from 'next/headers';
import { Card } from '@/components/ui/card';
import { Radio } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

type StartEventPageProps = IdParams;

const startEvent = async (id: string) => {
	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/start-event/${id}`, {
		method: 'GET',
	});

	if (!res.ok) {
		throw new Error('Failed to start event');
	}

	return await res.json();
};

const StartEventPage = async ({ params: { id } }: StartEventPageProps) => {
	const headersList = headers();
	const domain = headersList.get('host');
	const event = await getEventById(id);

	if (!event) {
		return notFound();
	}

	const startedEvent = await startEvent(id);

	return (
		<>
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">{event.name}</h1>
				<div className="ml-auto flex items-center gap-2">
					<Link
						className={buttonVariants({ size: 'sm', className: 'h-8 gap-1' })}
						href={`/admin/events/${id}/live`}
					>
						<Radio className="h-4 w-4" />
						Go live results
					</Link>
				</div>
			</div>
			<Card className="flex h-full flex-col items-center justify-center">
				<h2>Enter the join code</h2>
				<div className="flex items-center justify-center">
					<h3 className="text-6xl font-extrabold">{startedEvent.eventCode}</h3>
					<CopyToClipboardButton text={startedEvent.eventCode} />
				</div>
				<p>or</p>
				<h2>Scan QR code</h2>
				<QRCodeSVG value={`${domain}/join?code=${startedEvent.eventCode}`} />
			</Card>
		</>
	);
};

export default StartEventPage;
