import * as svgs from './svgs'
import React from 'react'

export type IconType = keyof typeof svgs
export const iconTypes = Object.keys(svgs) as IconType[]

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconType
}

function Icon({ name, ...props }: IconProps) {
  console.log('@@svgs', svgs)

  const SVGIcon = svgs[name]

  console.log('@@SVGIcon')

  const { ref, ...rest } = props

  // TODO. error Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
  return <SVGIcon {...rest} width="100%" height="100%" />
}

export default Icon
