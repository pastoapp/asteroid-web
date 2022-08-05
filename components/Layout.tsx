import React, { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    NavLink,
    Stack,
} from '@mantine/core';
import type { NavLinkProps } from '@mantine/core'
import { usePageContext } from '../renderer/usePageContext';

/**
 * Navbar button component to change routes
 * @param props object with href for the target link
 * @returns A link component that can be used in the navbar
 */
const NavbarItem = (props: { href: string } & NavLinkProps) => {
    const { urlPathname } = usePageContext()
    const isActive = urlPathname == props.href

    return <a href={props.href}>
        <NavLink {...props} active={isActive} sx={{ borderRadius: '5px' }} />
    </a>
}


/**
 * Main layout component
 * @param param0 Component props containing the children to render
 * @returns A layout component that can be used in the application
 */
export function MainLayout({ children }: { children: React.ReactNode }) {
    const theme = useMantineTheme();
    // mobile
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            // navbar
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <Stack>
                        <NavbarItem href="/" label={'Home'} />
                        <NavbarItem href="/login" label={'Login'} />
                        <NavbarItem href="/register" label={'Register'} />
                        <NavbarItem href="/notes" label={'Notes'} />
                        <NavbarItem href="/profile" label={'Profile'} />
                        <NavbarItem href="/about" label={'About'} />
                    </Stack>
                </Navbar>
            }
            // header
            header={
                <Header height={70} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        {/* mobile */}
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        {/* desktop */}
                        ☄
                        <Text
                            component="span"
                            align="center"
                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                            size="xl"
                            weight={900}
                            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
                            transform="uppercase"
                        >
                            ️ Asteroid Sync
                        </Text>
                    </div>
                </Header>
            }
        >
            {children}
        </AppShell>
    );
}