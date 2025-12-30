import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { States } from '../../Store/Store';
import Feed from '../../Components/Feed/Feed';
import Loading from '../../Components/Loading/Loading';
import './Person.css';
import play from '../../assets/img/play-button.png';

function Person() {
    const { personId } = useParams();
    const navigate = useNavigate();

    const { favourite, toggleFavourite, setShowSuggestions } = useContext(States);
    const [personDetails, setPersonDetails] = useState(null);
    const [credits, setCredits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFullBio, setShowFullBio] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setShowSuggestions(false);

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const apiKey = 'c21b18d183786cd4be5c3a6f768b1d95';

                // 1. Fetch Person Details with External IDs
                const detailsRes = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}&append_to_response=external_ids`);
                const detailsData = await detailsRes.json();
                setPersonDetails(detailsData);

                // 2. Fetch Combined Credits (Movies + TV)
                const creditsRes = await fetch(`https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}`);
                const creditsData = await creditsRes.json();

                // Sort by popularity (descending)
                const sortedCredits = (creditsData.cast || []).sort((a, b) => b.popularity - a.popularity);
                setCredits(sortedCredits);

            } catch (error) {
                console.error("Error fetching person data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [personId, setShowSuggestions]);

    const truncateText = (text, wordLimit) => {
        if (!text) return "";
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + "...";
        }
        return text;
    };

    const getGender = (g) => {
        if (g === 1) return "Female";
        if (g === 2) return "Male";
        if (g === 3) return "Non-binary";
        return "Not specified";
    };

    if (isLoading) return <Loading />;
    if (!personDetails) return <div className="person-page">Person not found</div>;

    return (
        <div className="person-page">
            {/* Back Button */}
            <button className="back-button" onClick={() => navigate(-1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
            </button>

            <div className="person-container">

                {/* Profile Header */}
                <div className="person-header">
                    <div className="person-image-container">
                        {personDetails.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/h632/${personDetails.profile_path}`}
                                alt={personDetails.name}
                            />
                        ) : (
                            <div className="no-profile-img">No Image</div>
                        )}
                    </div>

                    <div className="person-info">
                        <h1 className="person-name">{personDetails.name}</h1>

                        <div className="person-stats">
                            {personDetails.birthday && (
                                <div className="stat">
                                    <strong>Born:</strong> <span>{personDetails.birthday}</span>
                                </div>
                            )}
                            {personDetails.place_of_birth && (
                                <div className="stat">
                                    <strong>Place of Birth:</strong> <span>{personDetails.place_of_birth}</span>
                                </div>
                            )}
                            <div className="stat">
                                <strong>Gender:</strong> <span>{getGender(personDetails.gender)}</span>
                            </div>
                            <div className="stat">
                                <strong>Known For:</strong> <span>{personDetails.known_for_department}</span>
                            </div>
                        </div>

                        {personDetails.also_known_as && personDetails.also_known_as.length > 0 && (
                            <div className="person-aliases">
                                <strong>Also Known As:</strong>
                                <p>{personDetails.also_known_as.slice(0, 5).join(', ')}</p>
                            </div>
                        )}

                        {/* Social Media Links */}
                        {personDetails.external_ids && (
                            <div className="person-socials">
                                {personDetails.external_ids.imdb_id && (
                                    <a href={`https://www.imdb.com/name/${personDetails.external_ids.imdb_id}`} target="_blank" rel="noopener noreferrer" className="social-link imdb">IMDb</a>
                                )}
                                {personDetails.external_ids.instagram_id && (
                                    <a href={`https://instagram.com/${personDetails.external_ids.instagram_id}`} target="_blank" rel="noopener noreferrer" className="social-link insta">Instagram</a>
                                )}
                                {personDetails.external_ids.twitter_id && (
                                    <a href={`https://twitter.com/${personDetails.external_ids.twitter_id}`} target="_blank" rel="noopener noreferrer" className="social-link x">Twitter</a>
                                )}
                                {personDetails.external_ids.facebook_id && (
                                    <a href={`https://facebook.com/${personDetails.external_ids.facebook_id}`} target="_blank" rel="noopener noreferrer" className="social-link fb">Facebook</a>
                                )}
                            </div>
                        )}

                        <div className="person-bio">
                            <h3>Biography</h3>
                            <p>
                                {showFullBio ? personDetails.biography : truncateText(personDetails.biography, 50)}
                                {personDetails.biography && personDetails.biography.split(' ').length > 50 && (
                                    <button className="read-more-btn" onClick={() => setShowFullBio(!showFullBio)}>
                                        {showFullBio ? "Read Less" : "Read More"}
                                    </button>
                                )}
                                {!personDetails.biography && "No biography available."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filmography Grid */}
                <div className="person-credits">
                    <h2 className="section-title">Known For</h2>
                    <div className="home-content">
                        {credits.slice(0, 10).map((item) => (
                            <Feed
                                key={`${item.id}-${item.media_type}`} // Ensure unique key
                                item={item}
                                favourite={favourite.some(f => f.id === item.id)}
                                toggleFavourite={() => toggleFavourite(item.id, item)}
                            />
                        ))}
                        {credits.length === 0 && <p className="no-credits">No details available.</p>}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Person;
