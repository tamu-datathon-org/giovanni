export default function Page() {
    return (
        <>
            <div className='mainContent'>
                <h1>APPLICATION</h1>
                <form className="boxShadowContainer" onSubmit={(event) => handleSubmit(event, setToast)}>
                    <div className='vertical' style={{alignItems: 'center'}}>
                        <div className='input-wrapper'>
                            <label htmlFor='firstName' className='requiredField'>First name:</label>
                            <input type='text' required value={firstName} id='firstName'
                                   onChange={event => setFirstName(event.target.value)}/>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='lastName' className='requiredField'>Last name:</label>
                            <input type='text' required value={lastName} id='lastName'
                                   onChange={event => setLastName(event.target.value)}/>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='age' className='requiredField'>Age:</label>
                            <select id="age" value={age} onChange={event => setAge(event.target.value)} required>
                                <option value=''>---------</option>
                                <option value="16-">16 or younger</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24+">24 or older</option>
                            </select>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='country' className='requiredField'>Country of Residence:</label>
                            <div className='helperText'>Currently selected country: {country}</div>
                            <input type='text' id='country' value={countrySearchQuery} onChange={event => {
                                // removes autocomplete locally (so it doesn't block our search results)
                                event.target.setAttribute('autocomplete', 'off');
                                setCountrySearchQuery(event.target.value);
                                setCountryShowResults(true);
                            }} onBlur={() => setCountryShowResults(false)} onFocus={() => setCountryShowResults(true)}
                                   placeholder='Search for a country'/>
                            {countryShowResults && <ul style={{margin: 0}}>
                                {visibleCountries.map((currCountry, index) => (
                                    <li className='suggestion-item' key={index} onMouseDown={() => {
                                        setCountry(currCountry.name);
                                        setCountrySearchQuery(currCountry.name)
                                    }}>
                                        {currCountry.name}
                                    </li>))}
                            </ul>}
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='phoneNumber'>Phone number:</label>
                            <input type='text' value={phoneNumber} id='phoneNumber'
                                   onChange={event => setPhoneNumber(event.target.value)}/>
                        </div>


                        <div className='input-wrapper'>
                            <label htmlFor='searchQuery' className='requiredField'> What school do you go to? </label>
                            <div className='helperText'>Currently selected school: {school}</div>
                            <input type='text' required id='searchQuery' value={searchQuery} onChange={event => {
                                // removes autocomplete locally (so it doesn't block our search results)
                                event.target.setAttribute('autocomplete', 'off');
                                setSearchQuery(event.target.value);
                                setShowResults(true);
                            }} onBlur={() => setShowResults(false)} onFocus={() => setShowResults(true)}
                                   placeholder='Search for a school'/>
                            {showResults && <ul style={{margin: 0}}>
                                {visibleSchools.map((currSchool, index) => (
                                    <li className='suggestion-item' key={index} onMouseDown={() => {
                                        setSchool(currSchool.schoolName);
                                        setSearchQuery(currSchool.schoolName)
                                    }}>
                                        {currSchool.schoolName}
                                    </li>))}
                            </ul>}
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='major' className='requiredField'> What's your major? </label>
                            <select id='major' value={major} onChange={(event) => setMajor(event.target.value)}
                                    required>
                                <option value=''>---------</option>
                                <option value='Computer Science'>
                                    Computer Science
                                </option>
                                <option value='Computer Engineering'>
                                    Computer Engineering
                                </option>
                                <option value='Computing'>
                                    Computing
                                </option>
                                <option value='Data Engineering'>
                                    Data Engineering
                                </option>
                                <option value='Another engineering discipline'>
                                    Another engineering discipline (such as civil, electrical, mechanical, etc.)
                                </option>
                                <option value='Information systems, information technology, or system administration'>
                                    Information systems, information technology, or system administration
                                </option>
                                <option value='A natural science (such as biology, chemistry, physics, etc.)'>
                                    A natural science (such as biology, chemistry, physics, etc.)
                                </option>
                                <option value='Mathematics or statistics'>
                                    Mathematics or statistics
                                </option>
                                <option value='Web development or web design'>
                                    Web development or web design
                                </option>
                                <option value='Business discipline (such as accounting, finance, marketing, etc.)'>
                                    Business discipline (such as accounting, finance, marketing, etc.)
                                </option>
                                <option value='Humanities discipline (such as literature, history, philosophy, etc.)'>
                                    Humanities discipline (such as literature, history, philosophy, etc.)
                                </option>
                                <option
                                    value='Social science (such as anthropology, psychology, political science, etc.)'>
                                    Social science (such as anthropology, psychology, political science, etc.)
                                </option>
                                <option
                                    value='Fine arts or performing arts (such as graphic design, music, studio art, etc.)'>
                                    Fine arts or performing arts (such as graphic design, music, studio art, etc.)
                                </option>
                                <option value='Health science (such as nursing, pharmacy, radiology, etc.)'>
                                    Health science (such as nursing, pharmacy, radiology, etc.)
                                </option>
                                <option value='Other (please specify)'>Other (please specify)</option>
                                <option value='Undecided / No Declared Major'>Undecided / No Declared Major</option>
                                <option value='My school does not offer majors / primary areas of study'>My school does
                                    not offer majors / primary areas of study
                                </option>
                                <option value='Prefer not to answer'>Prefer not to answer</option>
                            </select>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='classification' className='requiredField'> What classification are
                                you? </label>
                            <select value={classification} id='classification'
                                    onChange={event => setClassification(event.target.value)} required>
                                <option value=''>---------</option>
                                <option value='LessThanSecondary'>Less than Secondary / High School</option>
                                <option value='Secondary'>Secondary / High School</option>
                                <option value='Undergrad2Year'>Undergraduate University (2 year - community college or
                                    similar)
                                </option>
                                <option value='Undergrad3PlusYear'>Undergraduate University (3+ year)</option>
                                <option value='Graduate'>Graduate University (Masters, Professional, Doctoral, etc)
                                </option>
                                <option value='CodeSchool'>Code School / Bootcamp</option>
                                <option value='Vocational'>Other Vocational / Trade Program or Apprenticeship</option>
                                <option value='PostDoc'>Post Doctorate</option>
                                <option value='Other'>Other</option>
                                <option value='NotStudent'>I’m not currently a student</option>
                                <option value='PreferNotToAnswer'>Prefer not to answer</option>
                            </select>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='anticipatedGradYear' className='requiredField'> What is your anticipated
                                graduation year?</label>
                            <select value={anticipatedGradYear} id='anticipatedGradYear'
                                    onChange={event => setAnticipatedgradYear(event.target.value)} required>
                                <option value=''>---------</option>
                                <option value='2024'>2024</option>
                                <option value='2025'>2025</option>
                                <option value='2026'>2026</option>
                                <option value='2027'>2027</option>
                                <option value='2028'>2028</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='gender' className='requiredField'> What's your gender? </label>
                            <select value={gender} id='gender' onChange={event => setGender(event.target.value)}>
                                <option value=''>---------</option>
                                <option value='NA'>Prefer not to answer</option>
                                <option value='M'>Male</option>
                                <option value='F'>Female</option>
                                <option value='NB'>Non-binary</option>
                                <option value='X'>Prefer to self-describe</option>
                            </select>
                        </div>

                        {gender === 'X' ? (<>
                                <div className='input-wrapper'>
                                    <label> Please self-describe </label>
                                    <input type='text' value={selfDescribeAns}
                                           onChange={event => setSelfDescribeAns(event.target.value)}
                                           placeholder='Please self-describe'/>
                                </div>
                            </>) : (<></>)}


                        <div className='input-wrapper'>
                            <label htmlFor='race' className='requiredField'> What race(s) do you identify with? </label>
                            <select value={race} id='race' onChange={event => setRace(event.target.value)} required>
                                <option value=''>---------</option>
                                <option value='Asian Indian'>Asian Indian</option>
                                <option value='Black or African'>Black or African</option>
                                <option value='Chinese'>Chinese</option>
                                <option value='Filipino'>Filipino</option>
                                <option value='Guamanian or Chamorro'>Guamanian or Chamorro</option>
                                <option value='Hispanic / Latino / Spanish Origin'>Hispanic / Latino / Spanish Origin
                                </option>
                                <option value='Japanese'>Japanese</option>
                                <option value='Korean'>Korean</option>
                                <option value='Middle Eastern'>Middle Eastern</option>
                                <option value='Native American or Alaskan Native'>Native American or Alaskan Native
                                </option>
                                <option value='Native Hawaiian'>Native Hawaiian</option>
                                <option value='Samoan'>Samoan</option>
                                <option value='Vietnamese'>Vietnamese</option>
                                <option value='White'>White</option>
                                <option value='Other Asian (Thai, Cambodian, etc)'>Other Asian (Thai, Cambodian, etc)
                                </option>
                                <option value='Other Pacific Islander'>Other Pacific Islander</option>
                                <option value='Other (Please Specify)'>Other (Please Specify)</option>
                                <option value='Prefer Not to Answer'>Prefer Not to Answer</option>
                            </select>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='hackathonsAttended' className='requiredField'> How many hackathons have you
                                attended? </label>
                            <select value={hackathonsAttended} id='hackathonsAttended'
                                    onChange={event => setHackathonsAttended(event.target.value)} required>
                                <option value=''>---------</option>
                                <option value='0'>This will be my first!</option>
                                <option value='1-3'>1-3</option>
                                <option value='4-7'>4-7</option>
                                <option value='8-10'>8-10</option>
                                <option value='10+'>10+</option>
                            </select>
                        </div>

                        {/* TODO forgor */}
                        <div className='input-wrapper'>
                            <label htmlFor='experienceLevel' className='requiredField'> What is your experience level in
                                Data Science? </label>
                            <select value={experienceLevel} id='experienceLevel'
                                    onChange={event => setExperienceLevel(event.target.value)} required>
                                <option value=''>---------</option>
                                <option value='Beginner'>Beginner</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Advanced'>Advanced</option>
                            </select>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='hasTeam' className='requiredField'> Do you have a team yet? </label>
                            <select id='hasTeam' value={hasTeam} onChange={event => setHasTeam(event.target.value)}
                                    required>
                                <option value=''>---------</option>
                                <option value='No'>I do have a team</option>
                                <option value='Yes'>I do not have a team</option>
                            </select>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='eventSource' className='requiredField'> How did you hear about TAMU
                                Datathon? </label>
                            <select id='eventSource' value={eventSource}
                                    onChange={event => setEventSource(event.target.value)} required>
                                <option value=''>---------</option>
                                <option value='Friend'>From a friend</option>
                                <option value='Social Media'>Social media</option>
                                <option value='Student Orgs'>Through another student org</option>
                                <option value='TD Organizer'>From a TAMU Datathon organizer</option>
                                <option value='ENGR Newsletter'>From the TAMU Engineering Newsletter</option>
                                <option value='MLH'>Major League Hacking (MLH)</option>
                                <option value='Attended Before'>I've attended TAMU Datathon before</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='shirtSize' className='requiredField'>What size shirt do you wear?</label>
                            <select id='shirtSize' value={shirtSize}
                                    onChange={event => setShirtSize(event.target.value)} required>
                                <option value=''>---------</option>
                                <option value='S'>Unisex S</option>
                                <option value='M'>Unisex M</option>
                                <option value='L'>Unisex L</option>
                                <option value='XL'>Unisex XL</option>
                                <option value='XXL'>Unisex XXL</option>
                            </select>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='address'>Address:</label>
                            <input type='text' id='address' value={address}
                                   onChange={event => setAddress(event.target.value)} placeholder='Enter a location'/>
                            <div className='helperText'>You will not receive swag and prizes without an address.</div>
                        </div>

                        {/*<div className='input-wrapper'>*/}
                        {/*  <label htmlFor='address' className = 'requiredField'>Upload your resume (PDF only, 1MB max):</label>*/}
                        {/*  <input type="file" required accept="application/pdf" onChange={handleFileChange}/>*/}
                        {/*</div>*/}

                        <div className='input-wrapper'>
                            <label htmlFor='reflinks'>Point us to anything you'd like us to look at while considering
                                your application:</label>
                            <input type='text' id='reflinks' value={referenceLinks}
                                   onChange={event => setReferenceLinks(event.target.value)}
                                   placeholder='ex. GitHub, Devpost, personal website, LinkedIn, resume, etc.'/>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='programmingJoke' className='requiredField'> Tell us your best programming
                                joke. </label>
                            <textarea id='programmingJoke' required value={programmingJoke}
                                      onChange={event => setProgrammingJoke(event.target.value)}/>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='dietaryRestrictions'>Do you require any special accommodations at the event?
                                Please list all dietary restrictions here.</label>
                            <textarea id='dietaryRestrictions' value={dietaryRestrictions}
                                      onChange={event => setDietaryRestrictions(event.target.value)}/>
                        </div>

                        <div className='input-wrapper'>
                            <label htmlFor='extraInfo'>Anything else you would like us to know?</label>
                            <textarea id='extraInfo' value={extraInfo}
                                      onChange={event => setExtraInfo(event.target.value)}/>
                        </div>

                        <div className='input-wrapper'
                             style={{display: "flex", alignItems: "center", columnGap: "12px"}}>
                            <div>
                                <input type="checkbox" id="liabilityTerms" className="checkBox" checked={liabilityTerms}
                                       onChange={event => setLiabilityTerms(event.target.checked)}/>
                            </div>
                            <label htmlFor='liabilityTerms' className="requiredField">
                                I agree to TAMU Datathon's <a className="mlh"
                                                              href="https://tamudatathon.com/legal/talent_liability_terms">Talent
                                Release and Liability terms</a>.
                            </label>
                        </div>

                        <div className='input-wrapper'>
                            <button className='appButton' type='submit'>Submit application</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}