import { Box, Card, Group, Image, Stack, Text, Title } from '@mantine/core'
import { IconLogin, IconHandClick, IconBrandGit, IconClipboardText, IconFileAnalytics, IconInfoSquare, IconUser } from '@tabler/icons'
import React from 'react'

export { Page }

export interface WelcomeCardProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  link: string
}

/**
 * Card at the landing page
 * 
 * @param param0 props for the component, see WelcomeCardProps
 * @returns JSX for the component
 */
function WelcomeCard({ title, subtitle, link, icon }: WelcomeCardProps) {
  return (<>
    <Card
      shadow="sm"
      p="xl"
      component="a"
      href={link}
      sx={{ width: '300px' }}
    >
      <Card.Section>
        <Group position='center' my="md">
          {icon}
        </Group>
      </Card.Section>

      <Text weight={500} size="lg" mt="md" align='center'>
        {title}
      </Text>

      <Text mt="xs" color="dimmed" size="sm" align='center'>
        {subtitle}
      </Text>
    </Card>
  </>)
}

/**
 * 
 * @returns JSX for the home-page
 */
function Page() {
  return (
    <>
      <Title mb={'xl'} align='center'>Welcome</Title>
      <Group position='center'>
        <WelcomeCard
          title={'Login'}
          subtitle={`Sign in with your existing user data.`}
          link="/login"
          icon={<IconLogin size={30} />}
        />
        <WelcomeCard
          title={'Register'}
          subtitle={`Sign up with a public key.`}
          link="/register"
          icon={<IconHandClick size={30} />}
        />
        <WelcomeCard
          title={'Notes'}
          subtitle={`View your notes.`}
          link="/notes"
          icon={<IconClipboardText size={30} />}
        />
        <WelcomeCard
          title={'Profile'}
          subtitle={`Get information about your profile`}
          link="/profile"
          icon={<IconUser size={30} />}
        />
        <WelcomeCard
          title={'About'}
          subtitle={`See who did what on this application`}
          link="/about"
          icon={<IconInfoSquare size={30} />}
        />
        <WelcomeCard
          title={'Repository'}
          subtitle={`Take a look at the source code`}
          link="https://gitlab.gwdg.de/v.mattfeld/asteroid-web"
          icon={<IconBrandGit size={30} />}
        />
        <WelcomeCard
          title={'Thesis'}
          subtitle={`See what has inspired this application`}
          // TODO add link
          link="#"
          icon={<IconFileAnalytics size={30} />}
        />
      </Group>
    </>
  )
}
