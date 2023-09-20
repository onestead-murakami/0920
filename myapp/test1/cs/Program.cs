
using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Net.Http.Headers;
using System.Net;
using System.Text;

class Program
{
    #nullable disable warnings
    private static async Task Main(string[] args)
    {
        //HTTPクライアント作成
        var http = new HttpClient();
        HttpResponseMessage mess = null;

        var basicAuth = Convert.ToBase64String(Encoding.ASCII.GetBytes("user:password"));
        var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:3000/api/secret");
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", basicAuth);

        //GETリクエスト
        mess = await http.SendAsync(request);
        HttpStatusCode status = mess.StatusCode;
        if (status != HttpStatusCode.OK)
        {
            Console.WriteLine("＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝データ取得失敗");
            Console.ReadLine();
            return;
        }
        else
        {
            //初回表示を作成
            mess = await http.GetAsync("http://localhost:3000/api/read");
            var json = await mess.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<ApiResult>(json);

            Console.WriteLine("＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝メッセージ表示");
            Console.WriteLine("＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝(" + data.UserName + ")");

            foreach (var line in data.Contents)
                Console.WriteLine(line);
            Console.WriteLine();

            while (true)
            {
                //エンター押下（無限ループ中の標準入力）を作成
                Console.Write("メッセージ送信（「quit」入力で終了）：");
                var input = Console.ReadLine();
                if (input == "quit")
                {
                    break;
                }
                else
                {
                    var param = new ApiPraram();
                    param.Message = input;
                    mess = await http.PostAsJsonAsync("http://localhost:3000/api/update", param);
                    json = await mess.Content.ReadAsStringAsync();
                    data = JsonConvert.DeserializeObject<ApiResult>(json);
                    Console.WriteLine("＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝メッセージ表示");
                    Console.WriteLine("＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝(" + data.UserName + ")");
                    
                    foreach (var line in data.Contents)
                        Console.WriteLine(line);
                    Console.WriteLine();
                }
            }
        }
        http.Dispose();
    }
    #nullable restore warnings
}

class ApiPraram {
    public string Message { get; set; } = "";
}

class ApiResult {
    public string UserName { get; set; } = "";
    public bool Result { get; set; } = false;
    public List<string> Contents { get; set; } = new List<string>();
}