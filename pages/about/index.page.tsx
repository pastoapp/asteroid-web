import { Anchor } from '@mantine/core'
import React from 'react'

export { Page }

function Page() {
  return (
    <>
      <h1>About</h1>
      <p>Work in progress 👷</p>
      <p>
        For more information visit the repository here for <Anchor href="https://gitlab.gwdg.de/v.mattfeld/asteroid-web">Frontend</Anchor> and here for <Anchor href="https://gitlab.gwdg.de/v.mattfeld/asteroid-server">Backend</Anchor>.
      </p>
    </>
  )
}
