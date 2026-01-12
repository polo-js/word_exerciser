import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<div>
				<h1>Home</h1>
				<Link href={'/login'}>Login</Link>
			</div>
		</div>
	);
}
