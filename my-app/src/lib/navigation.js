import { getMetadataForCategory } from "./posts";
// This helper converts a list of posts into the
// format our tree needs.
const formatPostsAsTreeItems = (posts, baseUrl) => {
  return posts.map((post) => ({
    id: post.slug,
    label: post.title,
    href: `${baseUrl}/${post.slug}`, // This creates the link URL
  }));
};

// This is the only function your layout will need to call
export function getNavigationTree() {
  // 1. Fetch all your post lists
  const articlesPosts = getMetadataForCategory("buddha/articles_on_buddha");
  const incidentsPosts = getMetadataForCategory(
    "buddha/incidents_from_the_life_of_the_buddha"
  );

  const discoursesPosts = getMetadataForCategory(
    "buddha/discourses_on_the_teachings_of_the_buddha"
  );
  const selecteddiciples = getMetadataForCategory(
    "buddha/stories_of_select_disciples_of_the_buddha"
  );
  const episodesPosts = getMetadataForCategory("sayagyi_u_ba_khin/episodes");
  const rememberingubkPosts = getMetadataForCategory(
    "sayagyi_u_ba_khin/remembering"
  );
  const rememberingsngPosts = getMetadataForCategory("sn_goenka/remembering");
  const discoursessngPosts = getMetadataForCategory("sn_goenka/discourses");

  // --- ADDITION: Fetch the new category ---
  const goenkaPosts = getMetadataForCategory("sn-goenka");

  // 2. Build the 'menuData' object (as pure JSON)
  const menuData = [
    {
      id: "chain-of-teachers",
      text: "Chain of Teachers",
      icon: "inbox", // String ID for the icon
      tree: [
        {
          id: "buddha",
          label: "Buddha",
          children: [
            {
              id: "life-of-buddha",
              label: "Life of The Buddha",
              href: "/introduction/chain_of_teachers/buddha/",
            },
            {
              id: "incidents",
              label: "Incidents From The Life Of The Buddha",
              children: formatPostsAsTreeItems(
                incidentsPosts,
                "/introduction/chain_of_teachers/buddha/incidents_from_the_life_of_the_buddha"
              ),
            },
            {
              id: "articles",
              label: "Articles/DisCourses On The Buddha",
              children: formatPostsAsTreeItems(
                articlesPosts,
                "/introduction/chain_of_teachers/buddha/articles_on_buddha"
              ),
            },
            {
              id: "discourses",
              label: "Discourses on the Teachings of the Buddha",
              children: formatPostsAsTreeItems(
                discoursesPosts,
                "/introduction/chain_of_teachers/buddha/discourses_on_the_teachings_of_the_buddha"
              ),
            },
            {
              id: "selected-diciples",
              label: "Stories of Selected Disciples of the Buddha",
              children: formatPostsAsTreeItems(
                selecteddiciples,
                "/introduction/chain_of_teachers/buddha/stories_of_selected_disciples_of_the_buddha"
              ),
            },
          ],
        },
        {
          id: "ven-ledi-sayadaw",
          label: "Ven Ledi Sayadaw",
          href: "/introduction/chain_of_teachers/ven_ledi_sayadaw/",
        },
        {
          id: "saya-thetgyi",
          label: "Saya Thetgyi",
          href: "/introduction/chain_of_teachers/saya_thetgyi/",
        },
        {
          id: "sayagyi-u-ba-khin",
          label: "Sayagyi U Ba Khin ",

          children: [
            {
              id: "life-of-sayagyi-u-ba-khin",
              label: "Life of Sayagyi U Ba Khin",
              href: "/introduction/chain_of_teachers/sayagyi_u_ba_khin/",
            },
            {
              id: "episodes",
              label: "Episodes from U Ba Khin's Life",
              children: formatPostsAsTreeItems(
                episodesPosts,
                "/introduction/chain_of_teachers/sayagyi_u_ba_khin/episodes"
              ),
            },
            {
              id: "remembering-ubakhin",
              label: "Remembering Sayagyi U Ba Khin",
              children: formatPostsAsTreeItems(
                rememberingubkPosts,
                "/introduction/chain_of_teachers/sayagyi_u_ba_khin/remembering"
              ),
            },
          ],
        },
        {
          id: "sn-goenka",
          label: "S. N. Goenka",

          children: [
            {
              id: "life-of-sn-goenka",
              label: "Life of S. N. Goenka",
              href: "/introduction/chain_of_teachers/sn_goenka/",
            },
            {
              id: "remembering-goenkaji",
              label: "Remembering Goenkaji",
              children: formatPostsAsTreeItems(
                rememberingsngPosts,
                "/introduction/chain_of_teachers/sn_goenka/remembering"
              ),
            },
            {
              id: "discoures-goenkaji",
              label: "Discourses by Mr. S. N. Goenka",
              children: formatPostsAsTreeItems(
                discoursessngPosts,
                "/introduction/chain_of_teachers/sn_goenka/discourses"
              ),
            },
          ],
        },
      ],
    },
    // --- ADDITION: The new top-level heading ---
    {
      id: "sn-goenka",
      text: "S.N. Goenka",
      icon: "mail", // Use a new icon ID
      tree: [
        {
          id: "goenka-bio",
          label: "Biography",
          href: "/introduction/sn-goenka/biography", // Example static link
        },
        {
          id: "goenka-discourses",
          label: "Discourses",
          // This populates the sub-menu dynamically
          children: formatPostsAsTreeItems(
            goenkaPosts,
            "/introduction/sn-goenka/discourses" // The base URL for these new posts
          ),
        },
      ],
    },
    {
      id: "apply",
      text: "Apply For Course",
      icon: "star", // String ID for the icon
      href: "/apply",
      tree: [
        {
          id: "a1",
          label: "10-Day Course",
         
        },
      ],
    },
  ];

  return menuData;
}
