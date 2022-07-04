import { useEffect, useState } from 'react'
import { db } from '../Firebase/Firebase'
import { Link } from 'react-router-dom'
import { Footer } from '../Layout/Footer/Footer';
import { DisplayFields } from '../Component/DisplayFields';
import { DisplayExperiences } from '../Component/DisplayExperiences';
import Spinner from '../Component/Spinner';

export default function Profile() {
    /**
  * @Variables and @Hooks
  */
    const [profile, setProfile] = useState();
    const [isLoading, setIsLoading] = useState(false);

    /**
* @Functions
*/
    useEffect(() => {
        getProfile();
    }, [])


    const getProfile = () => {
        const response = db
            .collection('profile')
            .doc('1');
        response.get().then(result => {
            const data = result.data().data;
            setIsLoading(true);
            let profile = {
                name: `${data.firstName} ${data.lastName}`,
                imageUrl: data.imageUrl,
                about: `${data.about}`,
                title: data.title,
                fields: {
                    Address: `${data.city}, ${data.country}`,
                    Phone: data.phone,
                    Email: data.email,
                    Birthday: new Date().toDateString(),

                },
                Urls: {
                    Linkedin: data.linkedinUrl,
                    Github: data.githubUrl,
                    Portfolio: data.portfolioUrl
                },
                workExperience: data.workExperience,
                education: data.education,
                languages: data.languages.map(x => x.title).join(', '),
                hobbies: data.hobbies.map(x => x.title).join(', '),
                activity: data.activity.map(x => x.title).join(', '),
                skills: data.skills.map(x => x.title).join(', '),
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            setProfile(profile);
        }).catch(err => {
            setIsLoading(true);
            let collection = JSON.parse(localStorage.getItem('profile'));
            setProfile(collection)
        })
    }

    return (
        <>

            {!isLoading && !profile ? <Spinner /> :
                <div className='min-h-full'>

                    <main className='-mt-24 pb-8'>
                        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-2'>
                            <h1 className='sr-only'>Profile</h1>
                            <div className='grid grid-cols-1 gap-4 items-start lg:gap-8'>
                                <div className='grid grid-cols-1 gap-4 lg:col-span-2'>
                                    {/* Personal Information Panel */}
                                    <section aria-labelledby='profile-overview-title'>
                                        <div className='rounded-lg bg-white overflow-hidden shadow'>
                                            <div className='bg-white p-6'>
                                                <div className='md:flex md:items-center md:justify-between'>

                                                    <div className='sm:flex sm:space-x-5'>
                                                        <div className='flex-shrink-0'>
                                                            <img className='mx-auto h-20 w-20 rounded-full' src={profile && profile.imageUrl} alt='' />
                                                        </div>

                                                        <div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left'>
                                                            <p className='text-sm font-medium text-gray-600'>Welcome back,</p>
                                                            <p className='text-xl font-bold text-gray-900 sm:text-2xl'>{profile.name}</p>
                                                            <p className='text-sm font-medium text-gray-600'>{profile.title}</p>
                                                        </div>
                                                    </div>
                                                    <div className='mt-5 flex justify-center sm:mt-0'>
                                                        <div>
                                                            {
                                                                Object.keys(profile.fields).map((field) => (
                                                                    <div key={field} className='sm:col-span-2'>
                                                                        <dd className='mt-1 text-sm text-gray-900'>
                                                                            <span className='font-semibold'>{field}</span>:
                                                                            <span className='ml-1'>{profile.fields[field]}</span> </dd>
                                                                    </div>
                                                                ))}

                                                            {
                                                                //Profile URL's

                                                                <div className='sm:col-span-2'>
                                                                    <dd className='mt-1 text-sm text-gray-900'>
                                                                        <span>
                                                                            <span className='font-semibold'>Github</span>:
                                                                            <a href={profile.Urls.Github} target='_blank' rel='noreferrer'
                                                                                className='text-blue-700 font-bold underline'>
                                                                                <span className='font-semibold'>{profile.Urls.Github}</span>
                                                                            </a>
                                                                        </span>
                                                                    </dd>

                                                                    <dd className='mt-1 text-sm text-gray-900'>
                                                                        <span>
                                                                            <span className='font-semibold'>Linkedin</span>:
                                                                            <a href={profile.Urls.Linkedin} target='_blank' rel='noreferrer'
                                                                                className='text-blue-700 font-bold underline'>
                                                                                <span className='font-semibold'>{profile.Urls.Linkedin}</span>
                                                                            </a>
                                                                        </span>
                                                                    </dd>

                                                                    <dd className='mt-1 text-sm text-gray-900'>
                                                                        <span>
                                                                            <span className='font-semibold'>Portfolio</span>:
                                                                            <a href={profile.Urls.Portfolio} target='_blank' rel='noreferrer'
                                                                                className='text-blue-700 font-bold underline'>
                                                                                <span className='font-semibold'>{profile.Urls.Portfolio}</span>
                                                                            </a>
                                                                        </span>
                                                                    </dd>
                                                                </div>
                                                            }



                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    to='/update-profile'
                                                    className='flex w-52 lg:m-0 mx-auto mt-2 justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                                                >
                                                    Edit profile
                                                </Link>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Information panel */}
                                    <section aria-labelledby='quick-links-title'>
                                        <div className='mt-2 max-w-5xl mx-auto px-4 sm:px-6 lg:px-2'>

                                            <div className='sm:col-span-6 mb-6'>
                                                <div className='text-lg font-bold text-black border-b-2'>Profile</div>
                                                <div
                                                    className='mt-1 text-sm text-gray-900 space-y-5'
                                                >
                                                    {profile.about}
                                                </div>
                                            </div>

                                            {/* 
                                          Here we are using DisplayExperiences for display Work experience and education etc.
                                        */}
                                            <DisplayExperiences options={profile.workExperience} title={'Work Experience'} />
                                            <DisplayExperiences options={profile.education} title={'Education'} />

                                            {/* 
                                          Here we are using DisplayFields for display activites etc.
                                        */}
                                            <DisplayFields options={profile.skills} title={'Skills'} />
                                            <DisplayFields options={profile.languages} title={'Languages'} />
                                            <DisplayFields options={profile.activity} title={'Certification'} />
                                            <DisplayFields options={profile.hobbies} title={'Hobbies'} />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* 
                    Here we are using footer Component to display Footer content
                */}
                    <Footer />
                </div>}

        </>
    )
}
