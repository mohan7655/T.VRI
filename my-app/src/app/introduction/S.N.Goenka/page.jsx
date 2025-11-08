import { Text } from "@/app/components/components";
import { Box, Typography } from "@mui/material";
import * as React from "react";

export default function Goenkaji() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Mr. S.N. Goenka
      </Typography>
      <Typography variant="h3" gutterBottom>
        Background
      </Typography>
      <Text variant="body1" gutterBottom>
        Although Indian by descent, Mr. Goenka was born and raised in Myanmar
        (Burma). While living there, he had the good fortune to come into
        contact with Sayagyi U Ba Khin and to learn the technique of Vipassana
        from him. After receiving training from his teacher for 14 years, Mr.
        Goenka settled in India and began teaching Vipassana in 1969. In a
        country still sharply divided by differences of caste and religion, the
        courses offered by Mr. Goenka soon attracted thousands of people from
        every part of society. In addition, many people from countries around
        the world came to join courses in Vipassana meditation. <br />
        <br />
        Over a period of almost 45 years, Mr. Goenka and the teachers appointed
        by him taught hundreds of thousands of people in courses in India and
        other countries, East and West. Today, meditation centers established
        under his guidance are operating in Asia, Europe, the Americas, Africa
        and Australasia.
        <br />
        <br />
        The technique taught by S.N. Goenka goes back two and a half millennia
        to the Buddha. The Buddha never taught a sectarian religion; he taught
        Dhamma – the way to liberation – which is universal. In the same
        tradition, Mr. Goenka's approach is totally non-sectarian. For this
        reason, his teaching has had a profound appeal to people of all
        backgrounds, of every religion and no religion, and from every part of
        the world.
        <br />
        <br />
        Mr. Goenka was the recipient of many awards and honors in his lifetime,
        including a prestigious Padma Awards from the President of India in
        2012. This is one of the highest civilian awards given by the Indian
        Government.
        <br />
        <br />
        Satya Narayan Goenka breathed his last in September 2013, at the age of
        89. He has left behind an imperishable legacy: the technique of
        Vipassana, now available more widely than ever before to people around
        the world.
      </Text>
    </Box>
  );
}
