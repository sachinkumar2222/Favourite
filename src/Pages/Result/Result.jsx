import React, { useContext, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import { States } from '../../Store/Store';
import Feed from '../../Components/Feed/Feed';
import './Result.css'

function Result() {
    const { searchResults, smallSidebar, toggleFavourite, favourite, isLoading, setShowSuggestions } = useContext(States);
    useEffect(() => {
        setShowSuggestions(false)
    },[]);
    return (
        <>
            <div className="result">
                <div className={`${smallSidebar ? 'small' : 'big'}`}>
                    {searchResults.length > 0 ? (
                        <div className="result-content">
                            {isLoading ? (
                                <Loading />
                            ) : (
                                searchResults.map((item) => (
                                    <Feed
                                        key={item.id}
                                        item={item}
                                        favourite={favourite[item.id] || false}
                                        toggleFavourite={() => toggleFavourite(item.id, item)}
                                    />
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="no-result">
                            <p>No results found</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Result;