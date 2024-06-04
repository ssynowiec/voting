'use client';

import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { CopyToClipboard as Rctc } from 'react-copy-to-clipboard';
import { useState } from 'react';

interface CopyToClipboardButtonProps {
	text: string;
}

export const CopyToClipboardButton = ({ text }: CopyToClipboardButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);

	return !isCopied ? (
		<Rctc text={text} onCopy={() => setIsCopied((prevState) => !prevState)}>
			<Button variant="ghost">
				<Copy className="h-4 w-4 text-muted-foreground" />
			</Button>
		</Rctc>
	) : (
		<Button variant="ghost">
			<Check className="h-4 w-4 text-green-500" />
		</Button>
	);
};
