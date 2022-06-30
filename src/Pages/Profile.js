import { useEffect, useState } from 'react'
import { db } from '../Firebase/Firebase'
import { Link } from 'react-router-dom'
import { Footer } from '../Layout/Footer/Footer';
import { DisplayFields } from '../Component/DisplayFields';
import { DisplayExperiences } from '../Component/DisplayExperiences';

export default function Profile() {
    /**
  * @Variables and @Hooks
  */
    const [profiles, setProfile] = useState();


    /**
* @Functions
*/
    useEffect(() => {
        getProfile();
    }, [])


    const getProfile = () => {
        db
            .collection('profile')
            .doc('1')
            .onSnapshot(snapshot => {
                const data = snapshot.data().data;
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
                        Linkedin: <a href={data.linkedinUrl} target='_blank' rel='noreferrer' className='text-blue-700 font-bold underline'>{data.linkedinUrl}</a>,
                        Github: <a href={data.githubUrl} target='_blank' rel='noreferrer' className='text-blue-700 font-bold underline'>{data.githubUrl}</a>,
                        Portfolio: <a href={data.portfolioUrl} target='_blank' rel='noreferrer' className='text-blue-700 font-bold underline'>{data.portfolioUrl}</a>,
                    },
                    workExperience: data.workExperience,
                    education: data.education,
                    languages: data.languages.map(x => x.title).join(', '),
                    hobbies: data.hobbies.map(x => x.title).join(', '),
                    activity: data.activity.map(x => x.title).join(', '),
                    skills: data.skills.map(x => x.title).join(', '),
                }
                setProfile(profile)
            })
    }

    return (
        <>
            {profiles ? <div className='min-h-full'>
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
                                                        <img className='mx-auto h-20 w-20 rounded-full' src={profiles.imageUrl} alt='' />
                                                    </div>
                                                    <div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left'>
                                                        <p className='text-sm font-medium text-gray-600'>Welcome back,</p>
                                                        <p className='text-xl font-bold text-gray-900 sm:text-2xl'>{profiles.name}</p>
                                                        <p className='text-sm font-medium text-gray-600'>{profiles.title}</p>
                                                    </div>
                                                </div>
                                                <div className='mt-5 flex justify-center sm:mt-0'>
                                                    <div>
                                                        {Object.keys(profiles.fields).map((field) => (
                                                            <div key={field} className='sm:col-span-2'>
                                                                <dd className='mt-1 text-sm text-gray-900'>
                                                                    <span className='font-semibold'>{field}</span>:
                                                                    {profiles.fields[field]}</dd>
                                                            </div>
                                                        ))}
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
                                                {profiles.about}
                                            </div>
                                        </div>

                                        {/* 
                                          Here we are using DisplayExperiences for display Work experience and education etc.
                                        */}
                                        <DisplayExperiences options={profiles.workExperience} title={'Work Experience'} />
                                        <DisplayExperiences options={profiles.education} title={'Education'} />

                                        {/* 
                                          Here we are using DisplayFields for display activites etc.
                                        */}
                                        <DisplayFields options={profiles.skills} title={'Skills'} />
                                        <DisplayFields options={profiles.languages} title={'Languages'} />
                                        <DisplayFields options={profiles.activity} title={'Certification'} />
                                        <DisplayFields options={profiles.hobbies} title={'Hobbies'} />
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
            </div> : ''}
        </>
    )
}
