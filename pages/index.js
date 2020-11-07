import { NextSeo } from 'next-seo'

const Index = () => {
  return (
    <>
    <NextSeo
      title="Teams index page"
      description="This is index page for teams"
    />
    <div className="container mx-auto">
        <div className="text-lg">This is index page</div>
    </div>
    </>
  )
}

export default Index
