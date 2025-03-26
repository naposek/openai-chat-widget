
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-3xl w-full text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">OpenAI Chat Widget</h1>
        <p className="text-xl text-gray-600 mb-8">An embeddable AI chat assistant for your website</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Chat Demo</CardTitle>
              <CardDescription>Try the AI chat assistant in a full page layout</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Experience the complete chat interface with all features enabled.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link to="/chat">Open Chat Demo</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Embeddable Widget</CardTitle>
              <CardDescription>See how the widget looks when embedded</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Preview the chat widget as it would appear embedded in your website.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link to="/embed">View Embeddable Widget</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">How to Embed</h2>
          <p className="mb-4">To embed this chat widget on your website, use this iframe:</p>
          <div className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-left mb-4">
            <code>{`<iframe src="${window.location.origin}${import.meta.env.BASE_URL}/embed" width="400" height="600" frameborder="0"></iframe>`}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
