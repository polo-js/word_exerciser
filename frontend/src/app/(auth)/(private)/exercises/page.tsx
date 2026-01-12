import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<h1>Exercises</h1>
			<Link href="/profile">Profile</Link>
			<Link href="/terms">Terms</Link>
		</div>
	);
}
