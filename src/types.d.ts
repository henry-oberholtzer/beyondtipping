interface NavigationDir {
  link: string,
  label: string,
}

interface HeaderFooterProps {
  navigation: NavigationDir[]
}

type Restaurant = {
  name: string;
  id: number;
  address: string;
  website: string;
  imageUrl: string;
}

interface Bio {
	name: string;
	contribution: string;
	blurb: string;
	imageUrl: string;
}

interface Type {
  name: string;
  amount: string;
}

interface HttpRequest {
  method: string;
  headers: {
    'Content-Type': 'application/json'
  },
  body?: string;
}
