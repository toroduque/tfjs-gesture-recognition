import React from 'react'
import Icon from '../Images/Icon'
import * as styled from './styled'

const Pagination = ({pageNumber, nextPage, previousPage}) => (
    <styled.PaginationWrapper>
        <div>
            { pageNumber > 1 && (
                <div onClick={previousPage}>
                    <Icon glyph="thumb-left" color="papayawhip" size={80}/>
                    <p>Previous</p>
                </div>
            )}
        </div>
      
        <h3>Page {pageNumber}</h3>
        <div>
            { pageNumber < 3 && (
                <div onClick={nextPage}>
                    <Icon glyph="thumb-right" color="papayawhip" size={80} />
                    <p>Next</p>
                </div>
            )}
        </div>
      

    </styled.PaginationWrapper>
)

export default Pagination