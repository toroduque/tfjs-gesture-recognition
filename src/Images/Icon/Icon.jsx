import React from 'react'
import glyphs from './glyphs'

const Icon = ({glyph, size = 100, color}) => (
    <svg viewBox="0 0 32 32" width={size} height={size} fill={color} xmlns="http://www.w3.org/2000/svg">
        { glyphs[glyph] }
    </svg>
)

export default Icon