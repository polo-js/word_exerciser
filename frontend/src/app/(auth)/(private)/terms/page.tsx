import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<h1>Terms</h1>
			<Link href="/exercises">Exercises</Link>
			<Link href="/profile">Profile</Link>
		</div>
	);
}
