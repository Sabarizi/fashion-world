export default function OrderSuccess() {
    return (
      <div className="container mx-auto text-center p-6">
        <h1 className="text-3xl font-bold text-green-600">🎉 Order Confirmed!</h1>
        <p className="mt-4 text-lg">Thank you for your purchase! A confirmation email has been sent.</p>
        <a href="/" className="text-blue-600 mt-4 inline-block">Return to Home</a>
      </div>
    );
  }
  