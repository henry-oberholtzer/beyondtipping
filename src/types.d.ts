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
  buttonLink: string;
  buttonText: string;
}
